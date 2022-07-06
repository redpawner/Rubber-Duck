import { useState, useEffect } from 'react';
import './dashboard.scss';

import Help from './help-request/help-request';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import {
  GET_USER,
  GET_HR_BY_LANGUAGE,
} from '../../../graphql/queries-mutations';
import { userStore } from '../../../state-stores/state-stores';
import { HelpReqSchema } from '../../../interfaces';
import Tag from './tag/tag';
import langTags from '../../../utils/tags';

function Dashboard() {
  const setUser = userStore((state) => state.setUser);
  const uid = userStore((state) => state.uid);
  const username = userStore((state) => state.username);

  const [showDrop, setShowDrop] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [helpRequests, setHelpRequests] = useState([]);

  console.log(uid);

  const [getUser] = useLazyQuery(GET_USER, {
    variables: {
      filter: {
        uid: uid,
      },
    },
    fetchPolicy: 'network-only',
  });

  const collectUser = async () => {
    const result = await getUser();
    const user = result.data.userOne;
    setUser(
      user.username,
      user.rating_total,
      user.rating_count,
      user.needHelp,
      user.email,
      user.avatar,
      user.help_request
    );
  };

  useEffect(() => {
    if (uid) {
      collectUser();
    }
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const [getHRByLanguage] = useLazyQuery(GET_HR_BY_LANGUAGE);

  const getHelpRequests = async () => {
    if (tags.length > 0) {
      const result = await getHRByLanguage({
        variables: {
          filter: {
            hr_languages: tags,
            needHelp: true,
          },
        },
      });

      setHelpRequests(
        result.data.userMany.map((hr: any) => {
          const result = { ...hr.help_request, avatar: hr.avatar };
          return result;
        })
      );
    } else {
      const result = await getHRByLanguage({
        variables: {
          filter: {
            hr_languages: null,
            needHelp: true,
          },
        },
      });
      setHelpRequests(
        result.data.userMany.map((hr: any) => {
          const result = { ...hr.help_request, avatar: hr.avatar };
          return result;
        })
      );
    }
  };

  useEffect(() => {
    if (uid) {
      getHelpRequests();
    }
  }, [tags, uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: any) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();

    if (value) {
      setShowDrop(true);
    } else {
      setShowDrop(false);
    }
    setFormValue(value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (tags.includes(value)) {
      return;
    }
    setTags((tags) => [...tags, value]);
  };

  const deselect = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setTags((tags) => tags.filter((tag) => tag !== value));
  };

  const mapLang = langTags
    .filter((tag) => tag.toLowerCase().includes(formValue))
    .map((tag, index) => {
      return (
        <div className="searchTile" onClick={handleClick} key={index}>
          {tag}
        </div>
      );
    });
  helpRequests.sort((a: HelpReqSchema, b: HelpReqSchema) => {
    return (
      new Date(a.time_created).getTime() - new Date(b.time_created).getTime()
    );
  });
  const mapHelpRequests = helpRequests
    .filter((hr: any) => {
      return hr.username !== username;
    })
    .map((helpRequest: HelpReqSchema, index) => {
      return (
        <li key={index}>
          <Help helpRequest={helpRequest} key={index} />
        </li>
      );
    });

  return (
    <div className="dashboard-container">
      <div className="flexcolumn">
        <div className="create-help-butt-div">
          <h1 className="dashboard-title">Help Requests</h1>
          <Link to="/createhelprequest">
            <button className="create-help-butt">
              <i className="fa fa-plus plus-sign"></i>
              <span className="create">&nbsp; Create</span>
            </button>
          </Link>
        </div>
        <div className="search-me-officer">
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault(); //this stops it loading URL with the name value
              setShowDrop(false);
            }}
          >
            <div className="dropdown-box">
              <input
                type="text"
                onChange={handleChange}
                name="search"
                autoComplete="off"
                placeholder="Filter..."
              />
              <div
                className={
                  showDrop ? 'dropdown-context' : 'dropdown-context-none'
                }
              >
                {mapLang}
              </div>
            </div>
          </form>
          <ul className="search-tags">
            {tags.map((tag, index) => {
              return (
                <div>
                  <Tag name={tag} onClick={deselect} key={index} />
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <ul className="help-list">{mapHelpRequests}</ul>
    </div>
  );
}

export default Dashboard;
