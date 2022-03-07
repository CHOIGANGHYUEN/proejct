import "./index.css";
import { farea, sarea, API_URL } from "../config/constant";
import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

function MainPage() {
  var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //slider 옵션변경 변수

  const [img, setImg] = useState([]);
  const [name, setName] = useState([]);
  const [like, setLike] = useState([]);
  // 랭킹시스템에서 이미지,이름,좋아요수를 받아오는 state변수들

  const [banner, setBanner] = useState([]);
  // 배너 데이터 가져오는 변수

  useEffect(() => {
    //area서버로부터 전체로 설정되었을 때의 값을 가져오는과정
    axios
      .get(`${API_URL}/area`)
      .then((res) => {
        const imgArrange = [];
        const nameArrange = [];
        const likeArrange = [];
        for (var i = 0; i < 3; i++) {
          imgArrange.push(res.data.results[i].ImgUrl);
          nameArrange.push(res.data.results[i].username);
          likeArrange.push(res.data.results[i].like_cnt);
        }
        setImg(imgArrange);
        setName(nameArrange);
        setLike(likeArrange);
      })
      .catch((err) => {
        console.error(err);
      });

    axios //banner서버로부터 banner이미지 가져오기
      .get(`${API_URL}/banners`)
      .then((res) => {
        setBanner(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // 통신해서 데이터 가져오기

  // select 박스에서 도시를 바꾸면 반응하여 이미지 변경해주는 코드
  const Citylist = () => {
    const { Option } = Select;
    const [fcities, setFcities] = useState(sarea[farea[0]]);
    const [scities, setScities] = useState(sarea[farea[0][0]]);
    const [tcities, setTcities] = useState(null);

    const handleFirstChange = (value) => {
      setFcities(sarea[value]);
      setScities(sarea[value][0]);
      setTcities(value);
      axios
        .post(`${API_URL}/area/renew`, {
          fname: value,
          sname: " ",
        })
        .then((res) => {
          const imgArrange = [];
          const nameArrange = [];
          const likeArrange = [];
          for (var i = 0; i < 3; i++) {
            imgArrange.push(res.data.results[i].ImgUrl);
            nameArrange.push(res.data.results[i].username);
            likeArrange.push(res.data.results[i].like_cnt);
          }
          setImg(imgArrange);
          setName(nameArrange);
          setLike(likeArrange);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const handelSecondChange = (value) => {
      setScities(value);
      axios
        .post(`${API_URL}/area/renew`, {
          fname: tcities,
          sname: value,
        })
        .then((res) => {
          const imgArrange = [];
          const nameArrange = [];
          const likeArrange = [];
          for (var i = 0; i < 3; i++) {
            imgArrange.push(res.data.results[i].ImgUrl);
            nameArrange.push(res.data.results[i].username);
            likeArrange.push(res.data.results[i].like_cnt);
          }
          setImg(imgArrange);
          setName(nameArrange);
          setLike(likeArrange);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    return (
      <>
        <Select
          defaultValue={farea[0]}
          style={{ width: 200 }}
          onChange={handleFirstChange}
        >
          {farea.map((first) => (
            <Option key={first}>{first}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          value={scities}
          onChange={handelSecondChange}
        >
          {fcities.map((second) => (
            <Option key={second}>{second}</Option>
          ))}
        </Select>
      </>
    );
  };

  return (
    <div>
      <div id="main">
        <h1>트레빔이 추천합니다!</h1>
        <div id="recommand-area">
          <Slider {...settings}>
            {banner.map((banner) => {
              return (
                <div className="banner-img-box">
                  <img className="banner-img" src={`${banner.ImgUrl}`}></img>
                </div>
              );
            })}
          </Slider>
        </div>
        <h1>지역별로 이달의 인기 포스트를 확인해보세요!</h1>
        <div id="polular-show">
          <div id="select-area">{Citylist()}</div>
          <div id="show-area">
            {img.map((value, index) => {
              return (
                <div className="area-card">
                  <div className="area-img">
                    <img src={img[index]}></img>
                  </div>
                  <div className="mp-ui">
                    <span>
                      이름 :
                      <b>
                        <a> {name[index]}</a>
                      </b>
                    </span>
                    <span>
                      좋아요 수 :
                      <b>
                        <a> {like[index]}</a>
                      </b>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <h1>트레빔 공식계정에 접속하세요!</h1>
      <div id="account-info">
        <div className="account-card">
          <img
            className="account-icon"
            src="../images/icon/facebook-icones.png"
          />
          <a className="account-link" href="#">
            <b>트레빔 페이스북 공식페이지</b>
          </a>
          <p className="account-explian">
            트레빔의 공식 페이스북 페이지에 접속하여 <br />
            다양한 여행정보를 확인해보세요
          </p>
        </div>

        <div className="account-card">
          <img className="account-icon" src="../images/icon/naver-icon.png" />
          <a className="account-link" href="#">
            <b>트레빔 블로그 공식페이지</b>
          </a>
          <p className="account-explian">
            트레빔의 공식 블로그에 페이지에 접속하여 <br />
            다양한 여행정보를 확인해보세요
          </p>
        </div>

        <div className="account-card">
          <img
            className="account-icon"
            src="../images/icon/instagram-icon.jpg"
          />
          <a className="account-link" href="#">
            <b>트레빔 인스타그램 공식페이지</b>
          </a>
          <p className="account-explian">
            트레빔의 공식 인스타그램에 페이지에 접속하여
            <br />
            다양한 여행정보를 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
