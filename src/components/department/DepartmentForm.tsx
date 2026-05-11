import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import type { Department, DepartmentRequest } from '../../types/department.types';

interface Props {
  initialValue?: Department;
  onSubmit: (payload: DepartmentRequest) => Promise<void>;
}

const DepartmentForm = ({ initialValue, onSubmit }: Props) => {
  const [form, setForm] = useState<DepartmentRequest>({
    name: initialValue?.name ?? '',
    description: initialValue?.description ?? '',
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
      <Input
        label="Department Name"
        required
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
      />
      <label className="field field-full">
        <span>Description</span>
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
        />
      </label>
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Department'}
      </Button>
    </form>
  );
};

export default DepartmentForm;
