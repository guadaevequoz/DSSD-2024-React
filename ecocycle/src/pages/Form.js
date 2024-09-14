const Form = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Nuevo recorrido</h1>
      <hr />
      <div className="row">
        <span className="text-lg">Materiales</span>
        <button className="align-self-end bg-teal">+</button>
      </div>
    </div>
  );
};

export default Form;
