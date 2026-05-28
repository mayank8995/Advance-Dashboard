import Card from "../../components/Card/Card"
import KeyMetric from "../../components/Card/KeyMetric"
import Chart from "../../components/Charts/Chart"

function Dashboard(){

    return(
        <div className="flex flex-col flex-auto">
            <Card>
                <KeyMetric></KeyMetric>
                <div className="flex flex-row flex-1 min-h-0 gap-4 p-4">
                    <div className="flex-[2] min-w-0">
                        <Chart></Chart>
                    </div>
                    <div className="flex-[1] min-w-0 flex flex-col gap-4">    
                        <Chart></Chart>
                        <Chart></Chart>
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Dashboard