import React from 'react';
import {createRoot} from 'react-dom/client';
import Rooms from './components/rooms';
function App(){
    return <Rooms/>
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>)