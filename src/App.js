import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHTTP from './hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);

    const url = 'https://react-http-678ba-default-rtdb.firebaseio.com/tasks.json';

    const { isLoading, error, sendRequest: fetchTasks } = useHTTP();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            const loadedTasks = [];
            for (const taskKey in tasksObj) {
                loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
            }
            setTasks(loadedTasks);
        };
        fetchTasks({ url: url }, transformTasks);
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
