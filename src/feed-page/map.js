/*global kakao*/
import { useEffect, useState } from "react";
//const img = require("../../public/");
const MapComponent = () => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    kakao.maps.load(() => {
      const c = [];
      c.push(document.getElementById("map1"));
      c.push(document.getElementById("map2"));
      c.push(document.getElementById("map3"));
      const o = [];
      o.push({
        center: new kakao.maps.LatLng(35.166635, 126.862907),
        level: 1,
      });
      o.push({
        center: new kakao.maps.LatLng(35.166635, 126.862907),
        level: 1,
      });
      o.push({
        center: new kakao.maps.LatLng(35.166635, 126.862907),
        level: 1,
      });
      const m = [];
      m.push(new kakao.maps.Map(c[0], o[0]));
      m.push(new kakao.maps.Map(c[1], o[1]));
      m.push(new kakao.maps.Map(c[2], o[2]));

      var positions = [
        // 마커가 표시될 위치입니다
        {
          latlng: new kakao.maps.LatLng(35.169521, 126.873097),
          content: "<div>광주천</div>",
        },
        {
          latlng: new kakao.maps.LatLng(35.156374, 126.856602),
          content: "<div>518공원</div>",
        },
        {
          latlng: new kakao.maps.LatLng(35.154655, 126.860228),
          content: "<div>상무고등학교</div>",
        },
      ];

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: m[0], // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          clickable: true,
        });

        marker.setMap(m[0]);
        bounds.extend(positions[i].latlng);

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(m[0], marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
        kakao.maps.event.addListener(marker, "click", function () {
          var url = `http://localhost:3000/p/1`;
          //url 뒤에 코드로 관리해서 코드바꾸면 바꾼코드서버로 연결되게 설정해놨음
          window.open(
            url,
            "임태원님의 광주여행",
            "width = 800, height=600, menubar=no, status = no, toolbar = no, location = no, fullscreen=no, resizable = no, left = 350, top = 162 "
          );
        });
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
      m[0].setBounds(bounds);
      m[0].setMaxLevel(m[0].getLevel() + 1);

      // 2번째 지도에 표시할 내용
      var positions2 = [
        // 마커가 표시될 위치입니다
        {
          latlng: new kakao.maps.LatLng(33.51470903037323, 126.54889599405654),
          content: "<div>국립 제주박물관</div>",
        },
        {
          latlng: new kakao.maps.LatLng(33.510307808166836, 126.49135055123219),
          content: "<div>제주국제공항</div>",
        },
        {
          latlng: new kakao.maps.LatLng(33.45188860580829, 126.4900751085539),
          content: "<div>제주 러브랜드</div>",
        },
      ];

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds2 = new kakao.maps.LatLngBounds();

      for (var i = 0; i < positions2.length; i++) {
        // 마커를 생성합니다
        var marker2 = new kakao.maps.Marker({
          map: m[1], // 마커를 표시할 지도
          position: positions2[i].latlng, // 마커를 표시할 위치
          clickable: true,
        });

        marker2.setMap(m[1]);
        bounds2.extend(positions2[i].latlng);

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: positions2[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker2,
          "mouseover",
          makeOverListener(m[1], marker2, infowindow),
          { passive: true }
        );
        kakao.maps.event.addListener(
          marker2,
          "mouseout",
          makeOutListener(infowindow),
          { passive: true }
        );
        kakao.maps.event.addListener(
          marker2,
          { passive: true },
          "click",
          function () {
            var url = `http://localhost:3000/p/1`;
            //url 뒤에 코드로 관리해서 코드바꾸면 바꾼코드서버로 연결되게 설정해놨음
            window.open(
              url,
              "임태원님의 광주여행",
              "width = 800, height=600, menubar=no, status = no, toolbar = no, location = no, fullscreen=no, resizable = no, left = 350, top = 162 "
            );
          }
        );
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
      m[1].setBounds(bounds2);
      m[1].setMaxLevel(m[1].getLevel() + 1);

      // 3번째 지도
      var positions3 = [
        // 마커가 표시될 위치입니다

        {
          latlng: new kakao.maps.LatLng(35.83734079778095, 129.28234512200456),
          content: "<div>경주월드</div>",
        },
        {
          latlng: new kakao.maps.LatLng(35.834848021511476, 129.21908456224344),
          content: "<div>첨성대</div>",
        },
        {
          latlng: new kakao.maps.LatLng(35.79021019737042, 129.33210313189448),
          content: "<div>불국사</div>",
        },
      ];

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds3 = new kakao.maps.LatLngBounds();

      for (var i = 0; i < positions3.length; i++) {
        // 마커를 생성합니다
        var marker3 = new kakao.maps.Marker({
          map: m[2], // 마커를 표시할 지도
          position: positions3[i].latlng, // 마커를 표시할 위치
          clickable: true,
        });

        marker3.setMap(m[2]);
        bounds3.extend(positions3[i].latlng);

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: positions3[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker3,
          "mouseover",
          makeOverListener(m[2], marker3, infowindow),
          { passive: true }
        );
        kakao.maps.event.addListener(
          marker3,
          "mouseout",
          makeOutListener(infowindow)
        );
        kakao.maps.event.addListener(marker3, "click", function () {
          var url = `http://localhost:3000/p/1`;
          //url 뒤에 코드로 관리해서 코드바꾸면 바꾼코드서버로 연결되게 설정해놨음
          window.open(
            url,
            "임태원님의 광주여행",
            "width = 800, height=600, menubar=no, status = no, toolbar = no, location = no, fullscreen=no, resizable = no, left = 350, top = 162 "
          );
        });
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
      m[2].setBounds(bounds3);
      m[2].setMaxLevel(m[2].getLevel() + 1);

      setMaps(m);
    });
  }, []);

  return maps;
};

export default MapComponent;
