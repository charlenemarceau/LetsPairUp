import React from "react";
import { useState } from "react";

function Advices() {
    const [moreText, setMoreText] = useState(false);
    
    const handleMore = () => {
        setMoreText(true);
    }


  return (
    <div className="adviceContainer">
      <h2>Les conseils de la communauté</h2>
      <div className="advice">
        <h3>Choisir son agence</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
      <div className="advice">
        <h3>Que mettre dans sa valise pour un an ?</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
      <div className="advice">
        <h3>Comment choisir sa famille d'accueille ?</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
      <div className="advice">
        <h3>Comment se préparer au départ ?</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
      <div className="advice">
        <h3>Les cours et les crédits</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
      <div className="advice">
        <h3>Activités enfants !</h3>
        { !moreText ? (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? 
          <span onClick={handleMore}>En lire plus</span>
        </p>
        ) : (
           <p onClick={() => setMoreText(!moreText)}> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ex
          repudiandae animi dolores vitae iste excepturi dignissimos iusto in
          necessitatibus asperiores cupiditate eos consequatur maiores dolor
          repellendus molestias beatae minus quia officiis, vero optio
          reprehenderit deleniti. Tempora magni dicta voluptas incidunt,
          adipisci veniam facere, totam odit vel rerum qui dolorem quidem atque
          amet debitis ipsa necessitatibus at blanditiis tenetur doloremque sed
          iure? Adipisci quibusdam est laborum similique quod error ut eaque,
          repellendus consequatur culpa non? Nobis architecto, soluta ut, sequi
          numquam harum quibusdam corrupti doloremque autem eaque veritatis
          commodi accusantium excepturi porro aliquid tempore laboriosam
          corporis voluptas blanditiis fuga magni fugit molestias in velit.
          Dolorum, provident officia. Impedit, culpa molestias, numquam dolorem
          beatae vel labore, eos rem ipsa iusto nam dolor at exercitationem!
          Dolore optio quia quam aperiam ipsam? Vitae sequi reprehenderit cum.
          Minima, doloremque magni cum consequatur deleniti quasi quis,
          laboriosam cumque quas, illum aspernatur modi voluptatum! Fugit,
          nostrum?</p>
        )
        }
      </div>
    </div>
  );
}

export default Advices;
