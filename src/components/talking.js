import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
} from 'react-flow-renderer';
//import Sidebar from './sidebar';
//import './index.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import Lbar from './lbar';
import Rbar from './rbar';
import Topbar from './topbar';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import CustomEdge from './customedge';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Gentxt from './gentext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DynamicForm from './dynamicForm';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const sourceNode = ({ data }) => {
    //console.log(data)
    return (
        <>
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>

                    <Avatar sx={{ bgcolor: blue[500], width: 24, fontSize: "80%", height: 24 }}>BML</Avatar>
                </center>

            </Box>

            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />
        </>
    );
}

const destinationNode = ({ data }) => {
    //console.log(data)
    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'secondary.main' }}
                isConnectable={true}
            />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'secondary.dark',
                    '&:hover': {
                        backgroundColor: 'secondary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>
                    {/* src ="https://source.unsplash.com/random/200x200?sig=3"  */}
                    <Avatar sx={{ bgcolor: deepPurple[500], width: 24, fontSize: "60%", height: 24 }}>
                        MIT
                    </Avatar>
                </center>

            </Box>

        </>
    );
}

const mNode = ({ data }) => {
    //console.log(data)
    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'warning.dark',
                    '&:hover': {
                        backgroundColor: 'warning.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 24, fontSize: "60%", height: 24 }}>
                        EAIESB
                    </Avatar>
                </center>

            </Box>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />

        </>
    );
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { source: sourceNode, destination: destinationNode, middle: mNode };
const edgeTypes = {
    custom: CustomEdge,
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Talking = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [structuredData, setStructuredData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = useState([])
    const [formValues, setFormValues] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState("")
    const [objDataStructure, SetObjDataStructure] = useState({})
    const [projectName, setProjectName] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onConnectEnd = () => {
    }
    useEffect(() => {
        if (edges.length !== 0) {
            setDatastructure(edges, nodes)
        }
    }, [edges]);

    const setDatastructure = (edges, nodes) => {
        console.log("Edges: ", edges)
        console.log("Nodes: ", nodes)
        let objList = {}
        for (let node of nodes) {
            let struct = {
                id: node.id,
                name: node.data.name,
                type: node.data.label,
                sources: [],
                targets: []
            }
            objList[node.id] = struct
        }
        console.log("Object List: ", objList)
        let struct = []
        for (let edge of edges) {
            objList[edge.source].targets.push(objList[edge.target].name)
            objList[edge.target].sources.push(objList[edge.source].name)

            struct[edge.source] = objList[edge.source]
            struct[edge.target] = objList[edge.target]
        }
        let arr = []
        for (let key in struct) {
            arr.push(struct[key])
        }
        console.log("The Structure is:", arr)
        setStructuredData(struct)
    }

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeObjstr = event.dataTransfer.getData('application/reactflow');
            let nodeObj = JSON.parse(nodeObjstr)
            const type = nodeObj.type
            //for form
            let nodeId = getId()
            let inputStatePrev = formState
            inputStatePrev[nodeId] = nodeObj.formFeilds
            setFormState(inputStatePrev)
            let dynamicFormPrev = formValues
            dynamicFormPrev[nodeId] = stateListInitiator(nodeObj.formFeilds, nodeId)
            setFormValues(dynamicFormPrev)

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: nodeId,
                type,
                position,
                data: { label: `${type} node`, name: nodeObj.nodeType },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const stateListInitiator = (info, id) => {
        let stateList = []
        let currObjDataStructure = objDataStructure
        currObjDataStructure[id] = {}
        for (let obj of info) {
            const reObj = {
                value: obj.defaultValue
            }
            currObjDataStructure[id][obj.id] = {}
            currObjDataStructure[id][obj.id].values = obj.defaultValue


            stateList.push(reObj)
        }
        SetObjDataStructure(currObjDataStructure)
        return stateList
    }

    const getFormValues = (currFormValues) => {
        let i = 0
        let currObjDataStructure = objDataStructure
        currObjDataStructure[selectedNodeId] = {}
        for (let formObj of formState[selectedNodeId]) {
            currObjDataStructure[selectedNodeId][formObj.id] = currFormValues[i]
            i++
        }
        // console.log(currObjDataStructure)
        SetObjDataStructure(currObjDataStructure)
        setDatastructure(edges, nodes)
    }

    const onDoubleClickOfNode = (node) => {
        setSelectedNodeId(node.id)
        handleOpen()
    }

    const generateProject = () => {
        let resultCode = Gentxt(structuredData, projectName)
        let zip = new JSZip();
        zip.file(projectName + ".txt", resultCode)
        downloadZip(projectName, zip)
    }

    const downloadZip = (name, zip) => {
        return zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, name + ".zip");
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className="dndflow" >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Topbar />
                    </Grid>
                    <Grid item xs={1}>
                        <Item><Lbar /></Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <ReactFlowProvider>
                                <div className="reactflow-wrapper" style={{ width: "100%", height: "70vh" }} ref={reactFlowWrapper}>
                                    <ReactFlow
                                        nodes={nodes}
                                        edges={edges}
                                        onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        onNodeDoubleClick={(event, node) => onDoubleClickOfNode(node)}
                                        onConnect={onConnect}
                                        onInit={setReactFlowInstance}
                                        onConnectEnd={onConnectEnd}
                                        nodeTypes={nodeTypes}
                                        onDrop={onDrop}
                                        onDragOver={onDragOver}
                                        fitView
                                    >
                                        <Controls />
                                        <Background />
                                        <MiniMap />
                                    </ReactFlow>
                                </div>

                            </ReactFlowProvider>

                        </Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Item><Rbar /></Item>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2}>
                        <item>
                            <Dialog PaperProps={{
                                style: {
                                    minHeight: '50%',
                                    minWidth: '30%',
                                }
                            }} open={open} onClose={handleClose}>
                                <div align="right">
                                    <CloseIcon onClick={handleClose} />
                                </div>
                                <DialogTitle><div style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                                    Configuration
                                </div></DialogTitle>
                                <DialogContent>
                                    <DynamicForm Form={formState[selectedNodeId]} inputStateList={formValues[selectedNodeId]} setInputStateList={getFormValues} isViewOnlyMode={isViewOnly} />
                                </DialogContent>
                            </Dialog>
                            <div>
                                <TextField id="outlined-basic" label="Project Name" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} variant="outlined" />
                            </div>
                            <br></br>
                            <div>
                                <Button variant="contained" onClick={generateProject}>Generate Project</Button>
                            </div>
                        </item>
                    </Grid>
                </Grid>
            </div>
        </Box>

    );
};

export default Talking;