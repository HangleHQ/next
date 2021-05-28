import { Img } from 'react-image'
import React from 'react'
import Loader from 'react-loader-spinner'

import { isValidImageURL, getURL } from '../../utils/msg'


function ImageLoader () {

    return (
      <Loader
      type="Puff"
      color="#6346d4"
      height={100}
      width={100}
      />
    )
  
  }
  
  function ImageFail () {
    return (
      <div className="image-failed">
        <h6 className="image-failed-title"> Invalid image </h6>
        <p className="image-failed-desc">This message linked to an image that failed to load.</p>
      </div>
    )
  }


export default function Messages({ messages }) {




    return (
        <div
            className={'messages'}
            id="messages"
        >

            <br />

            {
                messages.map((m, i, arr) => {
                    let content = m?.content;
                    let simpleJoin = content.map(xid => xid.value).join(' ')

                    let join = content.map((m, i, arr) => {
                        if (m.type === 'url') {
                            let name = m.value.replace(/(^\w+:|^)\/\//, '');
                            if (arr.length === 1 && isValidImageURL(getURL(simpleJoin))) return '';
                            return <a href={m.value} target="__blank"> {name} </a>
                        }

                        return m.value + ' ';
                    })

                    return (
                        <div className={`message ${arr[i - 1]?.author?.id === m?.author?.id ? 'inline' : 'withAuthor'}`} key={i}>
                            <div className="messageAuthor">
                                {
                                    arr[i - 1]?.author?.id === m?.author?.id ? null : <> { /** Message inline thing */}

                                        <img
                                            alt="pfp"
                                            className="messageAuthorAvatar"
                                            src={`https://cdn.hangle.me/avatars/${m?.d?.author?.id || m.author.id}/`}
                                        />

                                        <h5 className="messageAuthorUsername"> {m?.author?.username} </h5>
                                        <h6 className="messageAuthorNickname"> @{m?.author?.nickname || 'pyxel'} </h6>
                                        <h6 className="messageAuthorTimestamp"> {m.createdAtFormatted} </h6>
                                    </>
                                }
                            </div>

                            <p className="messageContent"> {join} </p>

                            {
                                isValidImageURL(getURL(simpleJoin)) && (getURL(simpleJoin)).match(/(cdn\.discordapp\.com|cdn\.hangle\.me)/gm)
                                    ?
                                    <>
                                        <br />
                                        <Img
                                            className="message-image"
                                            src={getURL(simpleJoin)}
                                            loader={<ImageLoader />}
                                            unloader={<ImageFail />}
                                        />
                                        <br />
                                    </>
                                    :
                                    null
                            }


                        </div>
                    )
                })
            }

        </div>
    )

}