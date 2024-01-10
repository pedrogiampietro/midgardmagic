import "./styles.css";
import BorderAvatar from "../../assets/Border/border-avatar-1.png";

export function Player({ name, level, points }: any) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex p-5 space-x-5">
        <div className="avatar avatar-large">
          <img
            src="https://github.com/pedrogiampietro.png"
            alt="Usuário"
            className="avatar-image"
          />
          <img src={BorderAvatar} alt="Moldura" className="avatar-frame" />
        </div>
      </div>
      <div>
        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          {name}
        </h6>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Level ( {level} )
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Pontos ( {points} )
        </p>
      </div>
    </div>
  );
}
