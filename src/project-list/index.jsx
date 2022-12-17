import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { clearObject, useDebounce, useMount } from "../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {

  const [param, setParam] = useState({ name: "", personId: "" });

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 200)

  useEffect(() => {
    return () => {
      fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debouncedParam))}`).then(async res => {
        if (res.ok) {
          setList(await res.json());
        }
      });
    };
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return <div>
    {/*搜索框*/}
    <SearchPanel param={param} setParam={setParam} users={users} />
    {/*用户表格*/}
    <List list={list} users={users} />
  </div>;
};
