import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import type { Role, RoleRequest } from '../../types/role.types';

interface Props {
  initialValue?: Role;
  onSubmit: (payload: RoleRequest) => Promise<void>;
}

const RoleForm = ({ initialValue, onSubmit }: Props) => {
  const [form, setForm] = useState<RoleRequest>({
    name: initialValue?.name ?? '',
    description: initialValue?.description ?? '',
    level: initialValue?.level ?? 1,
  });
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <Input label="Role Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input
        label="Level"
        type="number"
        min={1}
        max={10}
        required
        value={form.level}
        onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
      />
      <label className="field field-full">
        <span>Description</span>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Role'}
      </Button>
    </form>
  );
};

export default RoleForm;
