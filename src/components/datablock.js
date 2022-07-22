import React, { useState, useRef, useEffect,useCallback } from 'react';
import Dtable from './dtable'
import ReactFlow, {
    ReactFlowProvider,
    removeElements,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,MarkerType,
} from 'react-flow-renderer';
//import Sidebar from './sidebar';
//import './index.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import rows from './data.json'
import Avatar from '@mui/material/Avatar';
import CustomEdge from './customedge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UseGenerateRandomColor from './colors';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import Gensql from './gensql';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {MyContext} from './globalContext.js';

const initialNodes = [
    {
        id: '1',
        type: 'middle',
        data: { label: 'Input Node', value: "" },
        position: { x: 250, y: 25 },
    },
];
const columns = [
    {
        field: 'Name',
        headerName: 'Name',
        width: 100
    },
    {
        field: 'dataType',
        headerName: 'Type',
        width: 100
    },

]

const sourceNode = ({ data }) => {
    console.log(data)
    if(data.color===""){
        data.color="ff0000"
    }

    return (
        <>

            <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
                <Card variant="outlined" sx={{ maxWidth: 500, minHeight: 300, minWidth: 260 }}>
                    <CardHeader style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                {data.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">

                            </Typography>

                        </CardContent>

                    </React.Fragment>
                </Card>
            </Box>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
        </>
    )
}
const colNode = ({ data }) => {
    console.log(data)

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            <Card variant="outlined" sx={{ minWidth: 250 ,maxWidth: 260, maxHeight: 50 }}>

                <React.Fragment>
                    <CardContent  >

                        {data.label}     |    {data.value}

                    </CardContent>

                </React.Fragment>
            </Card>
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
const mNode = ({ data }) => {
    console.log(data)

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
                <Card variant="outlined" sx={{ maxWidth: 345, minHeight: 200 }}>
                    <CardHeader style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {data.value}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales felis turpis, vitae rhoncus mi congue ut. Nunc quis arcu quis nisl auctor bibendum at quis lectus.
                            </Typography>
                        </CardContent>

                    </React.Fragment>
                </Card>
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

const destNode = ({ data }) => {
    console.log(data)

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
                <Card variant="outlined" sx={{ maxWidth: 345, minHeight: 200 }}>
                    <CardHeader style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {data.value}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Dest node
                            </Typography>
                        </CardContent>

                    </React.Fragment>
                </Card>
            </Box>

        </>
    )
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { source: sourceNode, middle: mNode, dest: destNode, col: colNode };
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
let nodeId = 0;
let tableId=0;
const Datablock = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [objectEdit, setObjectEdit] = useState({});
    const { color, generateColor } = UseGenerateRandomColor();
    const [colId, setColId] = useState([]);
    const [pos,setPos] = useState({});
    const [structuredData, setStructuredData] = useState([]);
    const [projectName, setProjectName] = useState("")
    const [relation, setrelation] = React.useState('');
    const onDoubleClickOfNode = (node) => {
        { console.log("node", node) }
        setObjectEdit(node)

    }

    const onPaneClick = () => {
        setObjectEdit({});
    };
    
    const onConnect = (params) => setEdges((eds) => addEdge({ 
        ...params, type: 'custom', animated:true ,markerEnd: { type: MarkerType.Arrow }  }, eds));
    useEffect(() => {
        if (edges.length !== 0) {
            {console.log("edges",edges)}
            console.log("rel2",relation)
            // setDatastructure(edges, nodes,relation)
            // console.log("data,",structuredData)
        }   
    }, [edges]);

    // const setDatastructure = (edges, nodes,relation) => {
    //     console.log("Edges: ", edges)
    //     console.log("Nodes: ", nodes)
    //     let objList = {}
    //     for (let node of nodes) {
    //         let struct = {
    //             id: node.id,
    //             name: node.data.label,
    //             type: node.type,
    //             pNode: node.data.pNode,
    //             sources: [],
    //             targets: [],
    //             rel:`${relation}`,
    //             value:node.data.value,
    //             n:node.data.n,
    //             key:node.data.key
    //         }
    //         objList[node.id] = struct
    //     }
    //     console.log("Object List: ", objList)
    //     let struct = []
    //     for (let edge of edges) {
    //         objList[edge.source].targets.push(objList[edge.target].name)
    //         objList[edge.target].sources.push(objList[edge.source].name)
    //         struct[edge.source] = objList[edge.source]
    //         struct[edge.target] = objList[edge.target]
    //     }
    //     let arr = []
    //     for (let key in struct) {
    //         arr.push(struct[key])
    //     }
    //     console.log("The Structure is:", arr)
    //     setStructuredData(struct)
    // }
    const generateProject = () => {
        console.log("seeing this",nodes)
        let resultCode = Gensql(nodes,edges)
        let zip = new JSZip();
        zip.file(projectName + ".sql", resultCode)
        downloadZip(projectName, zip)
    }
    const downloadZip = (name, zip) => {
        return zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, name + ".zip");
        });
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const addINode = useCallback(() => {
        reactFlowWrapper.current += 50;
        generateColor()
        const tid = `${++tableId}`;
        const id = `${++nodeId}`;
        const position = {
            x: 250 ,
            y: 10 ,
        };
        setPos(position)
        setNodes((nodes) => {
            console.log(nodes);
            
            
            return [
                ...nodes,
                {
                    id,
                    type: "source",
                    data: { id:`${id}`,label: "Table "+`${tid}`, value: "", color: `${color}` },
                    position,
                }
            ];
        });
    }, [nodes]);
    // const addMNode = useCallback(() => {
    //     reactFlowWrapper.current += 50;
    //     generateColor()
    //     setNodes((nodes) => {
    //         console.log(nodes);
    //         return [
    //             ...nodes,
    //             {
    //                 id: Math.random().toString(),
    //                 type: "middle",
    //                 data: { label: "middle Node", value: "", color: `${color}` },
    //                 position: { x: 250, y: 25 },
    //             }
    //         ];
    //     });
    // }, []);
    // const addONode = useCallback(() => {
    //     reactFlowWrapper.current += 50;
    //     generateColor()
    //     setNodes((nodes) => {
    //         console.log(nodes);
    //         return [
    //             ...nodes,
    //             {
    //                 id: Math.random().toString(),
    //                 type: "dest",
    //                 data: { label: "Dest Node", value: "", color: `${color}` },
    //                 position: { x: 250, y: 25 },
    //             }
    //         ];
    //     });
    // }, [nodes]);
    console.log("object2:  ", colId)
    const toggleCol = () =>{
        setColId(objectEdit.id)

    }
    
    const addColid =() => {

        toggleCol()
        console.log("object 3: ",colId)
        addCol(colId)
        
    }
    // useEffect(() => {
        
    // }, [colId]);
    useEffect(
        ()=>{
          
          console.log("event12,",colId)
        },[colId]
      )
    const addCol = useCallback( async (event) => {
        
        reactFlowWrapper.current += 50;
        const position = {
            x: 10 ,
            y: 10,
        };
        console.log("object1:  ",colId)
        const id = `${++nodeId}`;
        const parentNode = `${colId}`;
        setNodes((nodes) => {
            console.log(nodes);
            return [
                ...nodes,
                {
                    id,
                    type: "col",
                    data: { label: "Col Node", value: "int" ,key:"none",n:"not null",pNode:`${colId}`},
                    position,
                    parentNode,
                    extent: 'parent',
                    // expandParent: true,
                }
            ];
        });
    }, [nodes]);



    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyContext.Provider value={[relation, setrelation]}>
                {console.log("rel",relation)}
                
                
            <div className="dndflow" >
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <Button size="large" variant="outlined"style={{margin:"30px" }} onClick={addINode}>+ Add Table</Button>
                        {/* <Button variant="outlined" onClick={addMNode}>Add Middle Node</Button>
                        <Button variant="outlined" onClick={addONode}>Add Output Node</Button> */}
                        
                        <div style={{ textAlign: "left", padding: 1 }}>

                            {console.log("object:", objectEdit.id)}
                            {
                                objectEdit.type === 'source' && (
                                    <>

                                        {"Table name :  "}
                                        <TextField
                                            style={{margin:"1px" }}
                                            size="small"
                                            value={objectEdit.data.label}
                                            onChange={(e) => {
                                                setObjectEdit({
                                                    ...objectEdit,
                                                    data: { ...objectEdit.data, label: e.target.value }
                                                });

                                                const newElement = nodes.map((item) => {
                                                    if (item.id === objectEdit.id) {
                                                        return {
                                                            ...item,
                                                            data: { ...item.data, label: e.target.value }
                                                        };
                                                    }
                                                    return item;
                                                });

                                                setNodes(newElement);
                                            }}
                                        />
                                        {" "}
                                        <Button style={{marginTop:"1px" }} variant="outlined" onClick={addColid}>+ Add Column</Button>
                                    </>
                                )}
                            {console.log("object:", objectEdit.id)}
                            {
                                objectEdit.type === 'col' && (
                                    <>
                                        
                                        
                                        
                                        <TextField
                                            value={objectEdit.data.label}
                                            style={{margin:"1px",maxWidth:100 }}
                                            size="small"
                                            onChange={(e) => {
                                                setObjectEdit({
                                                    ...objectEdit,
                                                    data: { ...objectEdit.data, label: e.target.value }
                                                });

                                                const newElement = nodes.map((item) => {
                                                    if (item.id === objectEdit.id) {
                                                        return {
                                                            ...item,
                                                            data: { ...item.data, label: e.target.value }
                                                        };
                                                    }
                                                    return item;
                                                });

                                                setNodes(newElement);
                                            }}
                                        />
                                        
                                            <Select
                                                
                                                style={{margin:"1px" }}
                                                size="small"
                                                value={objectEdit.data.value}
                                                label="datatype"
                                                onChange={(e) => {
                                                    setObjectEdit({
                                                        ...objectEdit,
                                                        data: { ...objectEdit.data, value: e.target.value }
                                                    });

                                                    const newElement = nodes.map((item) => {
                                                        if (item.id === objectEdit.id) {
                                                            return {
                                                                ...item,
                                                                data: { ...item.data, value: e.target.value }
                                                            };
                                                        }
                                                        return item;
                                                    });

                                                    setNodes(newElement);
                                                }}
                                            >
                                               <MenuItem value={'binary'}>binary</MenuItem>
                                                <MenuItem value={'blob'}>blob</MenuItem>
                                                <MenuItem value={'boolean'}>boolean</MenuItem>
                                                <MenuItem value={'char'}>char</MenuItem>
                                                
                                                <MenuItem value={'double'}>double</MenuItem>
                                                <MenuItem value={'enum'}>enum</MenuItem>
                                                <MenuItem value={'float'}>float</MenuItem>
                                                
                                                <MenuItem value={'int'}>int</MenuItem>
                                                
                                                <MenuItem value={'text'}>text</MenuItem>
                                                <MenuItem value={'varchar(255)'}>varchar</MenuItem>
                                            </Select>
                                            
                                            <Select
                                                style={{margin:"1px" }}
                                                size="small"
                                                value={objectEdit.data.key}
                                                label="Key"
                                                onChange={(e) => {
                                                    setObjectEdit({
                                                        ...objectEdit,
                                                        data: { ...objectEdit.data, key: e.target.value }
                                                    });

                                                    const newElement = nodes.map((item) => {
                                                        if (item.id === objectEdit.id) {
                                                            return {
                                                                ...item,
                                                                data: { ...item.data, key: e.target.value }
                                                            };
                                                        }
                                                        return item;
                                                    });

                                                    setNodes(newElement);
                                                }}
                                            >
                                                <MenuItem value={'primary key'}>Primary</MenuItem>
                                                <MenuItem value={'unique key'}>unique</MenuItem>
                                                <MenuItem value={' '}>none</MenuItem>
                                            </Select>
                                           
                                            <Select
                                                style={{margin:"1px" }}
                                                size="small"
                                                value={objectEdit.data.n}
                                                onChange={(e) => {
                                                    setObjectEdit({
                                                        ...objectEdit,
                                                        data: { ...objectEdit.data, n: e.target.value }
                                                    });

                                                    const newElement = nodes.map((item) => {
                                                        if (item.id === objectEdit.id) {
                                                            return {
                                                                ...item,
                                                                data: { ...item.data, n: e.target.value }
                                                            };
                                                        }
                                                        return item;
                                                    });

                                                    setNodes(newElement);
                                                }}
                                            >
                                                <MenuItem value={'null'}>null</MenuItem>
                                                <MenuItem value={'not null'}>not null</MenuItem>
                                                
                                            </Select>
                                        
                                    </>
                                )}
                        </div>
                        <div style={{marginTop:"21px" }}>
                               {"Project Name: "} <input size="small" style={{margin:"1px" }} id="outlined-basic" label="Project Name" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} variant="outlined" />
                        
                        <Button variant="contained" size="small" onClick={generateProject} style={{margin:"1px" }}>Generate Project</Button>
                        </div></Grid>
                    <Grid item xs={8}>
                        <Item>
                            <ReactFlowProvider>
                                <div className="reactflow-wrapper" style={{ width: "100%", height: "80vh" }} ref={reactFlowWrapper}>
                                    <ReactFlow
                                        nodes={nodes}
                                        edges={edges}
                                        onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        onInit={setReactFlowInstance}

                                        onNodeDoubleClick={(event, node) => onDoubleClickOfNode(node)}

                                        onPaneClick={onPaneClick}
                                        nodeTypes={nodeTypes}
                                        edgeTypes={edgeTypes}
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

                </Grid>
            </div>
            </MyContext.Provider>
        </Box>

    );
};

export default Datablock;