import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { SquarePen, Trash, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { ProductInterface } from '@/core/interfaces/product.interface';
import { useProductAdmin } from '@/core/hooks/admin/useProductAdmin';

interface ActionButtonsProps {
  product: ProductInterface;
}

export const ActionButtons = ({ product }: ActionButtonsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { deleteProduct } = useProductAdmin();
  
  const handleEdit = () => {
    navigate(`/admin/update-product/${product.$id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro que deseas eliminar el producto "${product.name}"?`)) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteProduct(product.$id || '');
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error eliminando producto:', error);
      toast.error('Error al eliminar el producto');
    } finally {
      setIsDeleting(false);
    }
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
      <Button
        className='cursor-pointer'
        variant='destructive'
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" color='white' />}
      </Button>
    </div>
  );
};