import React, { useEffect } from "react";
import Kakaomap from "../components/kakaomap";

interface IProps {
	children: React.ReactNode;
}

function Map({ children }: IProps) {
	const kakaoMap = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (kakaoMap && kakaoMap.current) {
			const x = 126.570667;
			const y = 33.450701;
			const coords = new (window as any).kakao.maps.LatLng(y, x); // 지도의 중심좌표
			const options = {
				center: coords,
				level: 4,
			};
			const map = new (window as any).kakao.maps.Map(kakaoMap.current, options);
			const marker = new (window as any).kakao.maps.Marker({
				position: coords,
				map,
			});
			// 맵의 중앙으로 이동
			map.relayout();
			map.setCenter(coords);
			// 마커를 중앙으로 이동
			marker.setPosition(coords);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			const zoomControl = new (window as any).kakao.maps.ZoomControl();
			map.addControl(zoomControl, (window as any).kakao.maps.ControlPosition.RIGHT);
		}
	}, [kakaoMap]);
	return <Kakaomap ref={kakaoMap} />;
}

export default Map;
