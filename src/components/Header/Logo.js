import React from 'react'
import {Image} from 'semantic-ui-react'

import contentstackLogo from '../../images/contentstack-logo.png'

const Logo = () => (
  <Image
    size="mini"
    src={contentstackLogo}
    style={{marginRight: '1.5em'}}
    alt="I love Lamp"
  />
)

export default Logo
