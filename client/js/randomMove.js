let intervalId = setInterval(() => {
  getRandomDirection();
}, 5000);

const queUrl = "http://127.0.0.1:3000/que";

const getRandomDirection = () => {
  $.get(queUrl, (data, status) => {
    SwimTeam.move(data);
  });
};

intervalId;
