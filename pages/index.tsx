import { Inter } from 'next/font/google'
import axios from 'axios'

import { useQuery,dehydrate } from '@tanstack/react-query'
import { GetServerSideProps, GetStaticProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

interface TodoProps{
  userId:number
  id:number
  title:string
  completed:boolean
}



export default function Home({ todosData }: { todosData: TodoProps[] }) {

  const { isLoading, error, data:todos} = useQuery<TodoProps[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData:todosData,
    keepPreviousData:true,
    staleTime:30000
  })

 

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
        {
                    todos.map(todo=>{
                      return(
                        <div key={todo.id} className='bg-slate-900 mt-4 p-4 rounded-md text-gray-100 flex flex-col items-center justify-center text-center'>
                          <ul>
                            <li>todo: {todo.title}</li>
                            <li>complete: {JSON.stringify(todo.completed)}</li>
                            <li>User: {todo.userId}</li>
                          </ul>
                        </div>
                      )
                    })                           
        }
      
    </main>
  )
}



async function getTodos(){
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_page=2')
  return response.data as TodoProps[] 
}

export const getServerSideProps:GetServerSideProps = async ()=>{
  const todosData = await getTodos()
  return {
    props:{
      todosData
    }
  }
}
