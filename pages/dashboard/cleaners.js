import Template from "../../layout/Template";
import Cleaners from "../../components/dashboard/cleaners/Cleaners";

const cleaners = () => {
  return (
    <>
      <Template page={<Cleaners />} />
    </>
  );
};

export default cleaners;
