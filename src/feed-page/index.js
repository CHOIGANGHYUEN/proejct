/*global kakao*/
import "./index.css";
import { Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import data from "../db/data.json";
import MapComponent from "./map";
import { useState } from "react";

function FeedPage() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  }; //slider 설정 변수
  const v = ["map1", "map2", "map3"];
  const maps = MapComponent();

  return v.map((value, index) => {
    return (
      <div id="feed">
        <div id="feed-section">
          <div className="feed-box">
            <div className="feed-summary-box">
              <div className="user-info">
                <img className="user-icon" src={data.user[index].icon}></img>
                <div className="un-pn">
                  <a className="user-name" href="#">
                    <b>{data.user[index].nickname}</b>
                  </a>
                  <a className="place-name" href="#">
                    {data.user[index].trip}
                  </a>
                </div>
              </div>
              <section className="main-contents">
                <Slider {...settings}>
                  <img
                    className="map-img"
                    src={data.user[index]["main-image"]}
                  ></img>
                  <div>
                    <div
                      id={`${value}`}
                      style={{ width: "748px", height: "700px" }}
                    ></div>
                  </div>
                </Slider>
              </section>
            </div>
            <div className="blog-summary-box">
              <div className="thumbnale-box">
                <img src={data.user[index].thumnale}></img>
              </div>
              <div className="info-box">
                <p className="info">{data.user[index].review}</p>
              </div>
            </div>
            <div className="guest-box">
              <section className="icon-box">
                <button className="icon" type="button">
                  <img src="../images/icon/outline_favorite_border_black_24dp.png"></img>
                </button>
                <button className="icon">
                  <img src="../images/icon/outline_chat_bubble_outline_black_24dp.png"></img>
                </button>
                <button className="icon">
                  <img src="../images/icon/outline_send_black_24dp.png"></img>
                </button>
              </section>
              <div className="guest-like">
                <span className="guest-name">
                  <a href="#">
                    <b>오유정</b>
                  </a>
                  님 외
                </span>
                <a className="like-cnt">
                  <b>{data.user[index].likecnt}</b>
                </a>
                <span>이 좋아합니다</span>
              </div>
              <div className="comment-box">
                <section className="user-section">
                  <div className="user-description">
                    <a href="#">
                      <b>{data.user[index].nickname}</b>
                    </a>
                    <p>여행 대성공</p>
                  </div>
                </section>
                <section className="guest-section">
                  <div className="comment-part">
                    <a href="#">
                      <div>
                        댓글 <span>3</span> 개 모두보기
                      </div>
                    </a>
                  </div>
                  <div className="comment-all">
                    <div className="guest-description">
                      <a href="#">
                        <b>chch_0120</b>
                      </a>
                      <p>앱개발 대성공</p>
                    </div>
                    <div className="guest-description">
                      <a href="#">
                        <b>molrang_ckh</b>
                      </a>
                      <p>로그인 대성공</p>
                    </div>
                  </div>
                </section>
                <hr />
                <section className="comment-section">
                  <div className="write-box">
                    <form className="comment-write-box">
                      <textarea
                        className="comment-write"
                        aria-label="댓글달기.."
                        placeholder="댓글달기.."
                        autoComplete="off"
                        autoCorrect="off"
                      ></textarea>
                      <Button className="comment-submit" type="text">
                        게시
                      </Button>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default FeedPage;
