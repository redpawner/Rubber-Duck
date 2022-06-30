import { useState, useEffect } from 'react';
import './dashboard.scss';
import { buttonsLogicStore } from '../../../state-stores/state-stores';
import Help from './help-request/help-request';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_USER } from '../../../graphql/queries-mutations';
import { userStore } from '../../../state-stores/state-stores';

export default function Dashboard() {
  const helpDash = buttonsLogicStore((state) => state.setHelp);
  const setUser = userStore((state) => state.setUser);

  const uid = userStore((state) => state.uid);

  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
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

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  const handleChange = (e: any) => {
    setFormValue(e.target.value);
  };

  const handleClick = () => {
    setTags((tags) => [...tags, formValue]);
  };

  return (
    <div className="dashboard-container">
      <div className="flexcolumn">
        <div className="create-help-butt-div">
          <h1 className="dashboard-title">Help Requests</h1>
          <button className="create-help-butt" onClick={helpDash}>
            <i className="fa fa-plus"></i> &nbsp; Create
          </button>
        </div>
        <div className="search-me-officer">
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault(); //this stops it loading URL with the name value
            }}
          >
            <input
              type="text"
              onChange={handleChange}
              name="search"
              autoComplete="off"
              placeholder="Filter..."
            />
            <button onClick={handleClick}>Bread</button>
          </form>
          <ul className="search-tags">
            <li>{tags}</li>
          </ul>
        </div>
      </div>

      <ul className="help-list">
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
      </ul>
    </div>
  );
}
