import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    rtl
    className="product-block"
    speed={2}
    width={280}
    height={523}
    viewBox="0 0 280 523"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="33" y="84" rx="6" ry="6" width="217" height="164" />
    <rect x="3" y="314" rx="6" ry="6" width="273" height="35" />
    <rect x="5" y="354" rx="6" ry="6" width="83" height="35" />
    <rect x="99" y="354" rx="6" ry="6" width="83" height="35" />
    <rect x="192" y="354" rx="6" ry="6" width="83" height="35" />
    <rect x="3" y="417" rx="6" ry="6" width="131" height="35" />
    <rect x="144" y="417" rx="6" ry="6" width="131" height="35" />
    <rect x="4" y="4" rx="6" ry="6" width="273" height="35" />
  </ContentLoader>
)

export default MyLoader
