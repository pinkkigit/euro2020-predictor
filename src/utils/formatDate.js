const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString().replaceAll("/", ".") +
    " " +
    date.toLocaleTimeString().slice(0, -3).replace(".", ":")
  );
};

export default formatDate;
