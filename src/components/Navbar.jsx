import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className='flex justify-between items-center p-6'>
      <div className='text-2xl font-bold'>Logo</div>
      <div className='flex items-center gap-10'>
        <nav>
          <ul className='flex gap-8'>
            <li className='hover:underline opacity-60 hover:opacity-90 text-lg'>
              <Link to='/'>Home</Link>
            </li>
            <li className='hover:underline opacity-60 hover:opacity-90 text-lg'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className='hover:underline opacity-60 hover:opacity-90 text-lg'>
              <Link to='/projects'>Projects</Link>
            </li>
            <li className='hover:underline opacity-60 hover:opacity-90 text-lg'>
              <Link to='/tasks'>Tasks</Link>
            </li>
          </ul>
        </nav>
        <div className='flex gap-4'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 rounded-full'
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>{user.name || "User"}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to='/login'>
                <Button className='bg-neutral-300/50 hover:bg-neutral-300/80'>
                  Login
                </Button>
              </Link>
              <Link to='/register'>
                <Button variant='ghost' className='bg-neutral-300/50'>
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
