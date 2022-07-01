import { useState, useEffect } from 'react';
import './dashboard.scss';
import { buttonsLogicStore } from '../../../state-stores/state-stores';
import Help from './help-request/help-request';
import { useLazyQuery } from '@apollo/client';
import {
  GET_USER,
  GET_HR_BY_LANGUAGE,
} from '../../../graphql/queries-mutations';
import { userStore } from '../../../state-stores/state-stores';
import { HelpReqSchema } from '../../../interfaces';
import Tag from './tag/tag';
import langTags from '../../../utils/tags'

function Dashboard() {
  const helpDash = buttonsLogicStore((state) => state.setHelp);
  const setUser = userStore((state) => state.setUser);
  const uid = userStore((state) => state.uid);

  const [showDrop,setShowDrop]=useState(false);
  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [helpRequests, setHelpRequests] = useState([]);

  const [getUser] = useLazyQuery(GET_USER, {
    variables: {
      filter: {
        uid: uid,
      },
    },
  });

  const collectUser = async () => {
    const result = await getUser();
    const user = result.data.userOne;
    setUser(
      user.username,
      user.rating_total,
      user.rating_count,
      user.needHelp,
      user.avatar,
      user.help_request
    );
  };

  useEffect(() => {
    collectUser();
  }, []);

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
    getHelpRequests();
  }, [tags]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log(value);
    setFormValue(value);
    // setTags(tags=>[...tags,value])
  };

  const handleClick = (e:any) => {
    const value = e.target.innerHTML;
    console.log(value);
    setFormValue(value);
    setTags((tags) => [...tags, formValue]);
  };

  const deselect = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setTags((tags) => tags.filter((tag) => tag !== value));
  };

  const mapLang = langTags.filter(tag => !tags.includes(tag)).map(tag => {return(
    <div onClick={handleClick}>{tag}</div>
  )})
  helpRequests.sort((a: HelpReqSchema, b: HelpReqSchema) => {
    return (
      new Date(a.time_created).getTime() - new Date(b.time_created).getTime()
    );
  });

  const mapHelpRequests = helpRequests.map((helpRequest: HelpReqSchema) => {
    return (
      <li>
        <Help helpRequest={helpRequest} key={helpRequest.username} />
      </li>
    );
  });

  const onHandleClick = () => {
    helpDash();

    window.history.replaceState(null, '', '/create-help-request');
  };

  return (
    <div className="dashboard-container">
      <div className="flexcolumn">
        <div className="create-help-butt-div">
          <h1 className="dashboard-title">Help Requests</h1>
          <button className="create-help-butt" onClick={onHandleClick}>
            <i className="fa fa-plus"></i> &nbsp; Create
          </button>
        </div>
        <div className="search-me-officer">
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault(); //this stops it loading URL with the name value
              console.log(e.target);
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
            <div className="dropdown-context-none">
              {mapLang}
            </div>
            </div>
          </form>
          <ul className="search-tags">
            {tags.map((tag) => {
              return (
                <div>

                  <Tag name={tag} onClick={deselect} />
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
