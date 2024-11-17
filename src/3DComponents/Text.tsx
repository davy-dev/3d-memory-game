import { Html } from "@react-three/drei";


function Text({
  fullChrono,
  hit,
  handleReset,
}: {
  fullChrono: string;
  hit: number;
  handleReset: () => void;
}) {
  return (
    <>
      <Html
        transform
        as="div"
        style={{
          position: "absolute",
          top: -555,
          left: 0,
          width: "320 px px",
        }}
      >
        <h1>Memory Game</h1>
        <p>Cliquer sur les cubes pour les sélectionner</p>
      </Html>{" "}
      <Html
        transform
        as="div"
        style={{ position: "absolute", top: -40, left: 0 }}
      >
        <div>
          <div>
            <h2>Nombre d'essais: {hit}</h2>
            <button
              className="btn"
              onClick={handleReset}
            >
              Réinitialiser
            </button>
          </div>
          <div>{fullChrono}</div>
        </div>
      </Html>{" "}
    </>
  );
}

export default Text;
