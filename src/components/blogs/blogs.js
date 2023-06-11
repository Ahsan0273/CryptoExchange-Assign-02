import Footer from "../footer/footer";
import Header from "../header/header";
import "./blogs.css";
import { Button, Space, Table } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

function Blogs(props) {
  const navigate = useNavigate();

  const onClickDelete = (recordId) => {
    props.removeBlog(recordId);
  }
  const NavigateToBlog = () => {
    navigate('/blog')
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'subTitle',
      dataIndex: 'subTitle',
      key: 'subTitle',
    },
    {
      title: 'author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/blog/${record.Id}`}>Update</Link>
          <Button type="primary" htmlType="submit" onClick={onClickDelete.bind(null, record.Id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
     <Header></Header>
     <div className="blogs">
     <Button style={{marginBottom: 10}} type="primary" htmlType="submit" onClick={NavigateToBlog}>Add</Button>
      <Table dataSource={props?.blogs || []} columns={columns} />;
    </div>
    <Footer></Footer>
  </>
    
  );
}

export default Blogs;
