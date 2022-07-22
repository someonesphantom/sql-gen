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

const RightSidebar = () => {
    const onDragStart = (event, nodeType,srcType) => {
        let nodeInfo = {type:nodeType,nodeType:srcType}
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                Sink
            </div>
            <div onDragStart={(e) => onDragStart(e, 'destination', "JSON")} draggable>
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'secondary.dark',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                JSON    
                </Box>
            </div>
            <div onDragStart={(e) => onDragStart(e, 'destination', "XML")} draggable>
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'secondary.dark',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                XML    
                </Box>
            </div>
            <div onDragStart={(e) => onDragStart(e, 'destination', "CSV")} draggable>
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'secondary.dark',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                CSV    
                </Box>
            </div>
            <div onDragStart={(e) => onDragStart(e, 'destination', "XLSX")} draggable>
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'secondary.dark',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                XLSX    
                </Box>
            </div>
        </aside>
    );

}

export default RightSidebar;