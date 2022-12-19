import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { clearObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const client = useHttp();
  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    return () => {
      client("/projects", { data: clearObject(debouncedParam) }).then(setList);
    };
  }, [debouncedParam]);

  useMount(() => {
    client("/users").then(setUsers);
  });

  return (
    <div>
      {/*搜索框*/}
      <SearchPanel param={param} setParam={setParam} users={users} />
      {/*用户表格*/}
      <List list={list} users={users} />
    </div>
  );
};
