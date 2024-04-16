import tshirt from "../images/merchandise/tshirt.jpg"

export default function Merchandise() {
    return (
        <div className="merchandise-container">
            <div className="gallery">
                <div className="gallery-item">
                    <img src={tshirt} alt="tshirt 1" />
                    <p>Price: 12€</p>
                    <p>Size: L, XL</p>
                </div>
                <div className="gallery-item">
                    <img src={tshirt} alt="tshirt 2" />
                    <p>Price: 20€ </p>
                    <p>Size: L, XL</p>
                </div>
                <div className="gallery-item">
                    <img src={tshirt} alt="tshirt 3" />
                    <p>Price: 18€</p>
                    <p>Size: L, XL</p>
                </div>
                <div className="gallery-item">
                    <img src={tshirt} alt="tshirt 4" />
                    <p>Price: 25€ </p>
                    <p>Size: L, XL</p>
                </div>
            </div>
        </div>
    );
}