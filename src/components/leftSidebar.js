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
import ArrayObjectOfNodes from './sourcenodes.json';

const LeftSidebar = () => {
    const onDragStart = (event, nodeType, srcType, formFeilds) => {
        let nodeInfo = { type: nodeType, nodeType: srcType, formFeilds: formFeilds }
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                Sources
            </div>
            {
                ArrayObjectOfNodes.map(
                    nodeInfo => <div key={nodeInfo.id} onDragStart={(event) => onDragStart(event, 'source', nodeInfo.type, nodeInfo.formFeilds)} style={{ display: "flex", justifyContent: "center" }} draggable>
                        {
                            SourceNode(nodeInfo.type)
                        }
                    </div>
                )
            }

        </aside>
    );

}
const SourceNode = (type) => {
    return (
        <Box
            sx={{
                width: 150,
                height: 150,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            {type}
        </Box>
    );
}

export default LeftSidebar;