import axios from "axios";
import { API_URL } from "./constant";
import { useEffect, useState } from "react";

export const Marker = () => {
  const [marker, setMarker] = useState([]);
  useEffect(async () => {
    await axios.get(`${API_URL}/location`).then((res) => {
      const markerData = res.data.result.map((value) => {
        return { ImgUrl: value.ImgUrl };
      });

      setMarker(markerData);
    });
  }, []);
  return marker;
};
