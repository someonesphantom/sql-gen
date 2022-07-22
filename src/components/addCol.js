import React, { useState, useRef, useEffect,useCallback } from 'react';
let num = 0;
export default function addColid(id){
     
    return([id,++num]);
}