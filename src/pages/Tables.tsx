import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableFaqCategory';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
