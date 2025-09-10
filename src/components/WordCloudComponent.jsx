import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export default function WordCloudComponent({ language, data = [] }) {
  const svgRef = useRef(null);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('WordCloudComponent - 받은 데이터:', data);
    if (data && data.length > 0) {
      // props로 받은 데이터 사용
      console.log('API 데이터 사용:', data);
      setWords(data);
      setIsLoading(false);
    } else {
      // 데이터가 없을 때 기본 키워드 사용
      console.log('기본 데이터 사용');
      const defaultWords = language === 'en' ? [
        ['Art', 25],
        ['History', 22],
        ['Culture', 20],
        ['Beauty', 18],
        ['Tradition', 16],
        ['Museum', 15],
        ['Exhibition', 14],
        ['Korean', 13],
        ['Ancient', 12],
        ['Masterpiece', 11],
        ['Heritage', 10],
        ['Aesthetic', 9],
        ['Timeless', 8],
        ['Inspiration', 7]
      ] : [
        ['예술', 25],
        ['역사', 22],
        ['문화', 20],
        ['아름다움', 18],
        ['전통', 16],
        ['박물관', 15],
        ['전시', 14],
        ['한국', 13],
        ['고대', 12],
        ['명작', 11],
        ['유산', 10],
        ['미학', 9],
        ['영원', 8],
        ['영감', 7]
      ];
      setWords(defaultWords);
      setIsLoading(false);
    }
  }, [language, data]);

  useEffect(() => {
    if (!words.length || isLoading) return;

    console.log('d3 워드클라우드 렌더링 시도:', { words: words.length, isLoading });
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 내용 제거

    const width = 500;
    const height = 350;

    svg.attr("width", width).attr("height", height);

    // 색상 스케일
    const color = d3.scaleOrdinal()
      .range(['#ffffff', '#60a5fa', '#a78bfa', '#f472b6', '#fb7185', '#fbbf24', '#34d399', '#22d3ee']);

    // 워드클라우드 생성
    const layout = cloud()
      .size([width, height])
      .words(words.map(d => ({ text: d[0], size: d[1] * 10 })))
      .padding(10)
      .rotate(() => Math.random() * 40 - 20)
      .font("Arial")
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      console.log('d3 워드클라우드 그리기 시작, 단어 수:', words.length);
      
      const g = svg.append("g")
        .attr("transform", `translate(${width / 2 + 50},${height / 2})`);

      g.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Arial, sans-serif")
        .style("fill", (d, i) => color(i))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, [words, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-white text-lg">
          {language === 'en' ? 'Loading word cloud...' : '워드클라우드 로딩 중...'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef}
        style={{ width: "100%", height: "100%" }}
        className="rounded-lg"
      />
      <div style={{ position: "absolute", top: "10px", left: "10px", color: "white", fontSize: "12px" }}>
        D3 Cloud | Words: {words.length}
      </div>
    </div>
  );
}