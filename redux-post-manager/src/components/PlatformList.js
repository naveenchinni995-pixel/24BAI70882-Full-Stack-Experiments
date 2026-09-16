import { useSelector } from "react-redux";

function PlatformList(){

    const platforms = useSelector(
        state=>state.platforms.platforms
    );

    return(

       <div className="platform-list">

            <h2>Platforms</h2>

            {

                platforms.map(item=>

                    <p className="platform" key={item.id}>
    {item.name}
</p>

                )

            }

        </div>

    );

}

export default PlatformList;