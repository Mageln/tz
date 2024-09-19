import Link from 'next/link';


export default function Home() {
  return (

  //   <div class="chat-notification">
   
  //   <div class="chat-notification-content">
  //     <h4 class="chat-notification-title">
  //     {/* <Link  href="/register">Регистрация</Link> */}
  //     </h4>
  //   </div>
  // </div>
  <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div className="shrink-0">
  </div>
  <div>
    <div className="text-xl font-medium text-black">
      <Link  href="/register">Регистрация</Link>
      </div>

  </div>
</div>

  )
 
}
