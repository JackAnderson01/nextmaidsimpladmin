import Home from "../../components/dashboard/home/Home";
import Template from "../../layout/Template"

const page = () => {
    return(
        <>
            <Template page={<Home />}/>
        </>
    )
}


export default page;