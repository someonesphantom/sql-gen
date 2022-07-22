import React from 'react';
//import './index.css';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Handle,

} from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple,blue } from '@mui/material/colors';
const Dblock = () => {
    const onClick = (event, nodeType, srcType) => {
        let nodeInfo = { type: nodeType, nodeType: srcType }
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    let ArrayObjectOfNodes = [{ type: "Rishwik",id:1},{ type: "Pradyumn",id:2 },{ type: "Ishaan",id:3 },{ type: "Nehul",id:4 }]
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                BML
            </div>
            {ArrayObjectOfNodes.map(
                nodeInfo => <div key={nodeInfo.id} onClick={(e) => onClick(e, 'source', nodeInfo.type)} style={{display:"flex",justifyContent:"center"}} >
                    {
                        SourceNode(nodeInfo.type)
                    }
                </div>
            )}
            
        </aside>
    );

}
const SourceNode = (type) => {
    return (
        <Box
            sx={{
                m:1,
                width: 150,
                height: 100,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <center>
                {type}
                <Avatar sx={{ bgcolor: blue[500], width: 40, fontSize: "50%", height: 40 }}>
                    BML
                </Avatar>
            </center>
        </Box>
    );
}

export default Dblock;