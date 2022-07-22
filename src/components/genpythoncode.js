export default function generatePythonCode(structuredData,appName) {
    let result=''
    result += 'import pyspark	\n'
    result += 'from pyspark.sql import SparkSession	\n'

    result += 'if __name__ == "__main__":	\n'
    result += '\tspark=SparkSession.builder.appName("'+appName+'").enableHiveSupport().getOrCreate()	\n'
    for(let obj in structuredData){
        if(structuredData[obj].type==="source node" && structuredData[obj].name==="Csv"){
            result += '\tdf= spark.read.options(header=True'+', inferSchema=True).csv("'+structuredData[obj].config.path.value+'")	\n'
            result += '\tdf.show()	\n'
        }
        if(structuredData[obj].type==="destination node" && structuredData[obj].name==="Json"){
            result += '\tdf.write.mode("Overwrite").json("'+structuredData[obj].config.path.value+'")	\n'
        }
    }
    console.log("The resultant python code is:",result)

    return result;
}