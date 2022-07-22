export default function Gentxt(structuredData,appName) {
    let result=''
    result += 'text file	\n'
    console.log('structure',structuredData)
    for(let obj in structuredData){
        console.log("print",structuredData[obj].name)
        if(structuredData[obj].type==="source node" ){
            result += structuredData[obj].name+'is talking to '
        }
        if(structuredData[obj].type==="middle node" ){
            result += 	structuredData[obj].name+',who listens and conveys it to '
        }
        if(structuredData[obj].type==="destination node" ){
            result += structuredData[obj].name
        }
    }
    console.log("The resultant txt file is:",result)

    return result;
}