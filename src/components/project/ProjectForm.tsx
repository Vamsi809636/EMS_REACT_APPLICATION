import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { PROJECT_STATUSES } from '../../utils/constants';
import type { Project, ProjectRequest, ProjectStatus } from '../../types/project.types';

interface Props {
  initialValue?: Project;
  onSubmit: (payload: ProjectRequest) => Promise<void>;
}

const ProjectForm = ({ initialValue, onSubmit }: Props) => {
  const [form, setForm] = useState<ProjectRequest>({
    name: initialValue?.name ?? '',
    description: initialValue?.description ?? '',
    startDate: initialValue?.startDate ?? '',
    endDate: initialValue?.endDate ?? '',
    status: initialValue?.status ?? 'PLANNED',
  });
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ ...form, endDate: form.endDate || undefined });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <Input label="Project Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Start Date" type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
      <Input label="End Date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
      <label className="field">
        <span>Status</span>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}>
          {PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>
      <label className="field field-full">
        <span>Description</span>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Project'}
      </Button>
    </form>
  );
};

export default ProjectForm;
