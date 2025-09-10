import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export default function WordCloudComponent({ language, data = [] }) {
  const svgRef = useRef(null);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'}/chat/all_sentences`
        );
        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("받아온 데이터:", data);

        // 문장을 단어로 나누고 단어 리스트 생성
        const wordList = [];
        if (data.sentences && data.sentences.length > 0) {
          data.sentences.forEach((sentence) => {
            const words = sentence.summary.split(" ");
            words.forEach((word) => {
              // 단어를 개별 가중치와 함께 추가 (랜덤 가중치 또는 특정 규칙 적용)
              wordList.push([word, Math.floor(Math.random() * 20) + 10]);
            });
          });
        } else {
          // API 데이터가 없을 때 기본 키워드 사용
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
          wordList.push(...defaultWords);
        }
        setWords(wordList);
      } catch (error) {
        console.error("API 요청 중 오류:", error);
        // 에러 시 기본 키워드 사용
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
          ['Masterpiece', 11]
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
          ['명작', 11]
        ];
        setWords(defaultWords);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentences();
  }, [language]);

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