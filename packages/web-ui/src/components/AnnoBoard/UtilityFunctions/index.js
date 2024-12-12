export const findShape = (shapes, userId, shapeId) => {
  if (!shapes[userId]) {
    return null;
  }

  const shape = shapes[userId].find((shape) => shape.id === shapeId);

  return shape || null;
};

export const compressData = (data, scale) => {
  const typeCode = {
    SCRIBBLE: 1,
    RECTANGLE: 2,
    CIRCLE: 3,
    ARROW: 4,
    CLEARALL: 5,
  };
  const processedData = data.map((item, index) => {
    let result = "";

    if (index === 0) {
      result += `${typeCode[item.type]},${item.userId},${item.currentPage},${
        item.id
      },${item.fillColor},`;
    }

    if (item.points && item.points.length === 2) {
      const formattedPoints = item.points
        .map((point, index) =>
          (!index ? point / scale.x : point / scale.y).toFixed(2)
        )
        .join(",");
      result += `${formattedPoints}`;
    }
    // console.log(result);
    return result;
  });

  return processedData.join("|");
};

export const decompressData = (compressedString, scale) => {
  const typeCode = {
    1: "SCRIBBLE",
    2: "RECTANGLE",
    3: "CIRCLE",
    4: "ARROW",
    5: "CLEARALL",
  };

  const parts = compressedString.split("|");

  console.log(compressedString);
  console.log("comp____________________________*********************");
  console.log(parts);

  console.log("parts____________________________*********************");
  const data = [];

  let currentTypeCode = "";
  let currentUserId = "";
  let currentPage = "";
  let currentId = "";
  let currentFillColor = "";

  parts.forEach((part, index) => {
    console.log(part);
    const values = part.split(",");

    if (index === 0 || values.length >= 3) {
      currentTypeCode = values[0].replace(/"/g, "");
      currentUserId = values[1];
      currentPage = values[2];
      currentId = values[3];
      currentFillColor = values[4];
    }

    if (values.length === 2 || (index === 0 && values.length > 4)) {
      let startPointIndex = index === 0 ? 5 : 0;
      for (let i = startPointIndex; i < values.length; i += 2) {
        let x = parseFloat(values[i].replace(/"/g, ""));
        let y = parseFloat(values[i + 1].replace(/"/g, ""));

        let points = [parseFloat(x * scale.x), parseFloat(y * scale.y)];

        // console.log(typeCode[currentTypeCode], typeCode, currentTypeCode);
        data.push({
          type: typeCode[currentTypeCode],
          userId: currentUserId,
          currentPage: currentPage,
          id: currentId,
          points: points,
          fillColor: currentFillColor,
        });
      }
    }
  });

  return data;
};
