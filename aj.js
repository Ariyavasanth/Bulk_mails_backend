function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "ariya" };
      resolve(data);
    }, 3000);
  });
}

  fetchData()
    .then((data) => {
      console.log("Data:", data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });

