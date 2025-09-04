import { Button } from '@/shared/components/ui/button';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { ProductInterface } from '@/core/interfaces/product.interface';

interface ActionButtonsProps {
  product: ProductInterface;
}

export const ActionButtons = ({ product }: ActionButtonsProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/update-product/${product.$id}`);
  };


    return (
      <div className='flex gap-1'>
        <Button
          className='cursor-pointer'
          variant='outline'
          onClick={handleEdit}
        >
          <SquarePen className="h-4 w-4" />
        </Button>
        {/* <Button
        className='cursor-pointer'
        variant='destructive'
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" color='white' />}
      </Button> */}
      </div>
    );
  }
