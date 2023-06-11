import Footer from "../../footer/footer";
import Header from "../../header/header";
import "./blog.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function Blog(props) {
  const [form] = Form.useForm();
  const [Id, setId] = useState('');
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { id } = useParams();
  useEffect(() => {
    if(id){
      const blog = props?.blogs?.find(blog => blog.Id === id);
      if(blog){
        form.setFieldsValue({ title: blog.title, subTitle: blog.subTitle, author: blog.author });
        setId(blog.Id);
        setTitle(blog.title);
        setSubTitle(blog.subTitle);
        setAuthor(blog.author);
        setKey(blog.key);
      }
    }
  }, [id, props, form])
 
  const navigate = useNavigate();
  const navigateToBlogs = () => {
    // Navigate to a different route
    navigate('/blogs');
  };
  const onClickAdd = () =>{
    const uuid = uuidv4();
    const uniqueId = uuid.replace(/-/g, '');
    const newBlog ={
      Id: uniqueId,
      key: uniqueId,
      title,
      subTitle,
      author
    }
    props.addBlog(newBlog);
    setAuthor('');
    setId('');
    setSubTitle('');
    setTitle('');
    setKey('');
    navigateToBlogs()
  }
  const onClickUpdate = () =>{
    const newBlog ={
      Id,
      key,
      title,
      subTitle,
      author
    }
    props.updateBlog(newBlog);
    setAuthor('');
    setId('');
    setSubTitle('');
    setTitle('');
    setKey('');
    navigateToBlogs()
  }
  return (
    <>
     <Header></Header>
     <div className="blog">
     <Form 
          form={form}
          className="form"
          labelCol={{span: 10}}
          style={{maxWidth: 1000}}
          layout="horizontal"
          onFinishFailed={(error) => {
            console.log({error});
          }}
        >
          <Form.Item name="title" label="Title: ">
            <Input placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)}/>
          </Form.Item>
          <Form.Item name="subTitle" label="SubTitle: ">
            <Input placeholder="Enter Sub Title" onChange={(e) => setSubTitle(e.target.value)}/>
          </Form.Item>
          <Form.Item name="author" label="Author: ">
            <Input placeholder="Enter Author" onChange={(e) => setAuthor(e.target.value)}/>
          </Form.Item>
          <Form.Item>
            { id ? <Button type="primary" htmlType="submit" onClick={onClickUpdate}>Update</Button>
             : <Button type="primary" htmlType="submit" onClick={onClickAdd}>Add</Button>}
          </Form.Item>
        </Form>
    </div>
    <Footer></Footer>
  </>
    
  );
}

export default Blog;