const HEAD = (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        border: " 5px solid #7760fa",
        position: "absolute",
        top: "30px",
        right: "-20px",
      }}
    />
  );
  const BODY = (
    <div
      style={{
        width: "5px",
        height: "100px",
        background: "#7760fa",
        position: "absolute",
        top: "65px",
        right: "-3px",
      }}
    />
  );
  const RIGHT_ARM = (
    <div
      style={{
        width: "50px",
        height: "3px",
        background: "#7760fa",
        position: "absolute",
        top: "110px",
        right: "-50px",
        rotate:"-30deg",
        transformOrigin:"left bottom"
      }}
    />
  );
  const LEFT_ARM = (
    <div
      style={{
        width: "50px",
        height: "3px",
        background: "#7760fa",
        position: "absolute",
        top: "110px",
        right: "0px",
        rotate: "30deg",
        transformOrigin: "right bottom",
      }}
    />
  );
  const RIGHT_LEG= (
    <div
      style={{
        width: "50px",
        height: "3px",
        background: "#7760fa",
        position: "absolute",
        top: "120px",
        right: "-50px",
        rotate: "40deg",
        transformOrigin: "left bottom",
      }}
    />
  );
  const LEFT_LEG = (
    <div
      style={{
        width: "50px",
        height: "3px",
        background: "#7760fa",
        position: "absolute",
        top: "120px",
        right: 0,
        rotate: "-40deg",
        transformOrigin: "right bottom",
      }}
    />
  );
  const BODY_PARTS=[HEAD,BODY,RIGHT_ARM,LEFT_ARM,RIGHT_LEG,LEFT_LEG]
  
  type HangmanDrawingProps={
    numberOfGusses:number
  }
  function HangmanDrwaing  ({numberOfGusses}:HangmanDrawingProps) {
    return (
      <div style={{ position: "relative" }}>
        {BODY_PARTS.slice(0,numberOfGusses)}
        <div
          style={{
            height: "30px",
            width: "5px",
            background: "#7760fa",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        <div
          style={{
            height: "5px",
            width: "150px",
            background: "#7760fa",
            marginLeft: "90px",
          }}
        />
        <div
          style={{
            height: "155px",
            width: "5px",
            background: "#7760fa",
            marginLeft: "90px",
          }}
        />
        <div style={{ height: "5px", width: "120px", background: "#7760fa" }} />
      </div>
    );
  };
  
  export default HangmanDrwaing;
  