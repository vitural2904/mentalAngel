import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './App.css';

const { Meta } = Card;

const SearchBarUI = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search functionality here (e.g., API call, filtering data, etc.)
    console.log('Search term:', searchTerm);
    // Clear input after submitting if needed:
    // setSearchTerm('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Cần bác sĩ tâm lý? Dưới đây là các lựa chọn dành cho bạn.</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Tìm</button>
      </form>
      {/* Display search results or other content here */}
    </div>
  );
};

const CardBasedNav = () => {

  return (

    <div class="category-container">
      <div class="category-card">
        <a href="https://chat.openai.com">
          <h3>mentalAngel Chatbot</h3>
        </a>
      </div>
      <div class="category-card">
        <a href="https://www.advancedinstaller.com/user-guide/qa-self-healing.html">
          <h3>Self - healing Packages</h3>
        </a>
      </div>
      <div class="category-card">
        <a href="https://dev.to/novu/building-a-forum-with-react-nodejs-6pe">
          <h3>Forum</h3>
        </a>
      </div>
    </div>

  );

};

const DoctorCard = ({ imageUrl, cardTitle, descriptionCard, curingField, exp, location }) => {

  return (

    <Card
      style={{ width: 350 }}
      cover={
        <img
          alt="example"
          src={ imageUrl }
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={cardTitle}
        description={descriptionCard}
      />
      <p>Nội dung chữa trị / Chuyên môn : {curingField}</p>
      <p>Kinh nghiệm : {exp}</p>
      <p>Địa chỉ phòng khám / nơi công tác : {location}</p>
    </Card>

  );

};

const DoctorContent = () => {

  return (

  <Row gutter={16} >
    <Col span={8}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DoctorCard 
          imageUrl="https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" 
          cardTitle="Nguyễn Văn A"
          descriptionCard="100.000đ / buổi"
          curingField="Các bệnh rối loạn tâm thần, bệnh tâm lý thể nhẹ"
          exp="10+ năm trong ngành"
          location="Số 123, Đường ABC, Thành phố XYZ"
        />
      </div>
    </Col>
    <Col span={8}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DoctorCard 
          imageUrl="https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" 
          cardTitle="Nguyễn Văn B"
          descriptionCard="140.000đ / buổi"
          curingField="Các bệnh tâm lý phổ biến ở giới trẻ"
          exp="5+ năm trong ngành"
          location="Số 422, Đường ABC, Thành phố XYH"
        />
      </div>
    </Col>
    <Col span={8}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DoctorCard 
          imageUrl="https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" 
          cardTitle="Nguyễn Văn C"
          descriptionCard="150.000đ / buổi"
          curingField="Tâm lý học đường, tâm lý hôn nhân gia đình, ..."
          exp="4+ năm trong ngành"
          location="Số 13, Đường ADC, Thành phố XAZ"
        />
      </div>
    </Col>
  </Row>

  );
};

const App = () => {

  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Search term:', searchTerm);
    // Perform actions with the search term (e.g., API calls, filtering data, etc.)
  };

  return (
    <div>
      <h2>mentalAngel</h2>
      <div>
        <CardBasedNav />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <SearchBarUI onSearch={handleSearch}/>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <button class="filter-btn">Bộ lọc</button>
      </div>
      <div >
        <DoctorContent />
      </div>
    </div>
  );

};

export default App;
