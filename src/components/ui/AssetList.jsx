import './AssetList.css'

function AssetList({ th, asset }) {
    return (
        <div className='assetlist-desktop'>
            <table>
                <thead>
                    <tr>
                        {th.map((theader, idx) => (
                            <th key={idx}>{theader}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {asset}
                </tbody>
            </table>
        </div>
    )
}


function AssetListMobile({ asset }) {
    return (
        <div className='assetlist-mobile'>
            <table>
                <tbody>
                    {asset}
                </tbody>
            </table>
        </div>
    )
}

export default AssetList
export { AssetListMobile }