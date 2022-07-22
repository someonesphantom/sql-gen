import { GridRowModes,DataGrid, GridToolbar, GridToolbarContainer,GridActionsCellItem} from '@mui/x-data-grid';
import React, { useState, useRef, useCallback } from 'react';
import rows from './data.json'
export default function Dtable(props){
    const columns =[
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


    return(
        <div style={{ height: 200, width: "100%" }}>
            <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={2}
                        rowsPerPageOptions={[5]}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            width:"100%",
                            
                        }}
                        
                    />
        </div>
    );
}