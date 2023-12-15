import ChatIcon from "../img/ChatIcon";

const HavingNoResult = () => {
    return(
        <>
            <div className="row position-relative">
                <h2 className="position-absolute d-inline-block text-center"
                style={{top: "2rem",color: "black"}} >
                    Không tìm thấy kết quả cần tìm. Vui lòng thử lại...
                </h2>
                <img src="https://static.vecteezy.com/ti/vecteur-libre/p3/2723693-aucun-resultats-trouves-illustration-rien-dans-la-boite-concept-gratuit-vectoriel.jpg" alt=""
                style={{width:1500,height:600}}/>
            </div>
            <ChatIcon/>
        </>
    )
}
export default HavingNoResult;